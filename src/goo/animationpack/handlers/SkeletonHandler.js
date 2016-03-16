import ConfigHandler from '../../loaders/handlers/ConfigHandler';
import Joint from '../../animationpack/Joint';
import Skeleton from '../../animationpack/Skeleton';
import SkeletonPose from '../../animationpack/SkeletonPose';
import PromiseUtils from '../../util/PromiseUtils';
import ObjectUtils from '../../util/ObjectUtils';



	/**
	 * Handler for loading skeletons into engine
	 * @extends ConfigHandler
	 * @param {World} world
	 * @param {Function} getConfig
	 * @param {Function} updateObject
	 * @private
	 */
	function SkeletonHandler() {
		ConfigHandler.apply(this, arguments);
	}

	SkeletonHandler.prototype = Object.create(ConfigHandler.prototype);
	SkeletonHandler.prototype.constructor = SkeletonHandler;
	ConfigHandler._registerClass('skeleton', SkeletonHandler);

	/**
	 * Adds/updates/removes a skeleton. A Skeleton is created once and then reused, but skeletons
	 * are rarely updated.
	 * @param {string} ref
	 * @param {Object} config
	 * @param {Object} options
	 * @returns {RSVP.Promise} Resolves with the updated entity or null if removed
	 */
	SkeletonHandler.prototype._update = function (ref, config/*, options*/) {
		if (!this._objects.has(ref)) {
			if (!config) {
				return PromiseUtils.resolve();
			}
			var joints = [];
			ObjectUtils.forEach(config.joints, function (jointConfig) {
				var joint = new Joint(jointConfig.name);
				joint._index = jointConfig.index;
				joint._parentIndex = jointConfig.parentIndex;
				joint._inverseBindPose.matrix.data.set(jointConfig.inverseBindPose);

				joints.push(joint);
			}, null, 'index');

			var skeleton = new Skeleton(config.name, joints);
			var pose = new SkeletonPose(skeleton);
			pose.setToBindPose();
			this._objects.set(ref, pose);
		}

		return PromiseUtils.resolve(this._objects.get(ref));
	};

	export default SkeletonHandler;
