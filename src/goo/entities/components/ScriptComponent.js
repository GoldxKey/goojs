define([
	'goo/entities/components/Component',
	'goo/entities/SystemBus'
],
/** @lends */
function (
	Component,
	SystemBus
	) {
	'use strict';

	/**
	 * @class Contains scripts to be executed each frame when set on an active entity
	 * @param {Array|object} [scripts] A script-object or an array of script-objects to attach to the entity.
	 * The script-object needs to define the function <code>run({@link Entity} entity, number tpf)</code>.
	 */
	function ScriptComponent(scripts) {
		this.type = 'ScriptComponent';

		if (scripts instanceof Array) {
			this.scripts = scripts;
		} else if (scripts) {
			this.scripts = [scripts];
		} else {
			/**
			 * @type {Array}
			 */
			this.scripts = [];
		}
	}

	ScriptComponent.prototype = Object.create(Component.prototype);

	/**
	 * Runs the .setup method on each script; called when the ScriptComponent is attached to the entity or when the entity is added to the world
	 * @private
	 * @param entity
	 */
	ScriptComponent.prototype.setup = function (entity, env) {
		var commonEnvironment = {
			getEntity: function () {
				return entity;
			},
			getSystemBus: function () {
				return SystemBus;
			},
			domElement: env.domElement
		};

		for (var i = 0; i < this.scripts.length; i++) {
			var script = this.scripts[i];

			script.environment = commonEnvironment;

			if (script.setup) {
				script.setup(script.parameters, script.environment);
			}
		}
	};

	/**
	 * Runs the update function on every script attached to this entity
	 * @private
	 * @param entity {Entity}
	 * @param tpf {number}
	 * @param environment
	 */
	ScriptComponent.prototype.run = function (entity, tpf, environment) {
		for (var i = 0; i < this.scripts.length; i++) {
			var script = this.scripts[i];
			if (script && script.run && (script.enabled === undefined || script.enabled || script.active)) {
				script.run(entity, tpf, environment, script.parameters);
			} else if (script.update && (script.enabled === undefined || script.enabled || script.active)) {
				script.update(script.parameters, script.environment);
			}
		}
	};

	/**
	 * Reverts any changes done by setup; called when the entity loses its ScriptComponent or is removed from the world
	 * @private
	 */
	ScriptComponent.prototype.cleanup = function () {
		for (var i = 0; i < this.scripts.length; i++) {
			var script = this.scripts[i];
			if (script.cleanup) {
				//script.cleanup(script.parameters, script.environment);
			}
		}
	};

	/**
	 * Attempts to add a script to an entity. The object can be a { run: Function } object or a Function. The entity is supposed to get a ScriptComponent with a script created out of the passed object
	 * @private
	 * @param obj {Function | { run: Function }}
	 * @param entity {Entity}
	 * @returns {boolean}
	 */
	ScriptComponent.applyOnEntity = function (obj, entity) {
		if (obj instanceof Function || (obj && obj.run instanceof Function)) {
			var scriptComponent;
			if (!entity.scriptComponent) {
				scriptComponent = new ScriptComponent();
				entity.setComponent(scriptComponent);
			} else {
				scriptComponent = entity.scriptComponent;
			}
			scriptComponent.scripts.push(obj.run instanceof Function ? obj : { run: obj });

			return true;
		}
	};

	return ScriptComponent;
});