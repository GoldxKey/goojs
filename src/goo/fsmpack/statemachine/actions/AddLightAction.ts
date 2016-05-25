import Action = require('./Action');
import {External} from './IAction';

var LightComponent = require('../../../entities/components/LightComponent');
var PointLight = require('../../../renderer/light/PointLight');
var DirectionalLight = require('../../../renderer/light/DirectionalLight');
var SpotLight = require('../../../renderer/light/SpotLight');

class AddLightAction extends Action {
	private _untouched: boolean;
	type: string;
	range: number;
	angle: number;
	penumbra: number;
	color: Array<number>;

	constructor(id: string, options: any){
		super(id, options);
	}

	static external: External = {
		key: 'Add Light',
		name: 'Add Light',
		description: 'Adds a point light to the entity.',
		type: 'light',
		parameters: [{
			name: 'Color',
			key: 'color',
			type: 'vec3',
			control: 'color',
			description: 'Color of the light.',
			'default': [1, 1, 1]
		}, {
			name: 'Light type',
			key: 'type',
			type: 'string',
			control: 'dropdown',
			description: 'Light type.',
			'default': 'Point',
			options: ['Point', 'Directional', 'Spot']
		}, {
			name: 'Range',
			key: 'range',
			type: 'float',
			control: 'slider',
			min: 0,
			max: 1000,
			description: 'Range of the light.',
			'default': 200
		}, {
			name: 'Cone Angle',
			key: 'angle',
			type: 'float',
			control: 'slider',
			min: 1,
			max: 170,
			description: 'Cone angle (applies only to spot lights).',
			'default': 30
		}, {
			name: 'Penumbra',
			key: 'penumbra',
			type: 'float',
			control: 'slider',
			min: 0,
			max: 170,
			description: 'Penumbra (applies only to spot lights).',
			'default': 30
		}],
		transitions: []
	}

	enter(fsm: any) {
		var entity = fsm.getOwnerEntity();
		if (entity.lightComponent) {
			this._untouched = true;
			return;
		}

		var light;
		if (this.type === 'Directional') {
			light = new DirectionalLight();
		} else if (this.type === 'Spot') {
			light = new SpotLight();
			light.range = +this.range;
			light.angle = +this.angle;
			light.penumbra = +this.penumbra;
		} else {
			light = new PointLight();
			light.range = +this.range;
		}

		light.color.setDirect(this.color[0], this.color[1], this.color[2]);

		entity.setComponent(new LightComponent(light));
	}

	cleanup(fsm: any) {
		if (this._untouched) { return; }

		var entity = fsm.getOwnerEntity();
		if (entity) {
			entity.clearComponent('LightComponent');
		}
	}
}

export = AddLightAction;