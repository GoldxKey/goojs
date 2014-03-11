require([
	'goo/entities/GooRunner',
	'goo/entities/World',
	'goo/renderer/Material',
	'goo/renderer/shaders/ShaderLib',
	'goo/renderer/Camera',
	'goo/shapes/ShapeCreator',
	'goo/entities/components/CameraComponent',
	'goo/scripts/OrbitCamControlScript',
	'goo/entities/components/ScriptComponent',
	'goo/renderer/MeshData',
	'goo/entities/components/MeshRendererComponent',
	'goo/math/Vector3',
	'goo/renderer/light/PointLight',
	'goo/renderer/light/DirectionalLight',
	'goo/renderer/light/SpotLight',
	'goo/entities/components/LightComponent',
	'goo/geometrypack/PolyLine'
], function (
	GooRunner,
	World,
	Material,
	ShaderLib,
	Camera,
	ShapeCreator,
	CameraComponent,
	OrbitCamControlScript,
	ScriptComponent,
	MeshData,
	MeshRendererComponent,
	Vector3,
	PointLight,
	DirectionalLight,
	SpotLight,
	LightComponent,
	PolyLine,
	V
	) {
	'use strict';

	function latheDemo(goo) {
		var section = PolyLine.fromCubicSpline([
			3 + 0, -1, 0,
			3 + 1, 0, 0,
			3 + 1, 1, 0,
			3 + 0, 1, 0,
			3 + -1, 1, 0,
			3 + -1, 2, 0,
			3 + 0, 3, 0], 20);

		var latheMeshData = section.lathe(20);

		var material = new Material(ShaderLib.simpleLit);
		var latheEntity = goo.world.createEntity(latheMeshData, material);
		latheEntity.addToWorld();

		var normalsMeshData = latheMeshData.getNormalsMeshData(4);
		var normalsMaterial = new Material(ShaderLib.simpleColored);
		normalsMaterial.uniforms.color = [0.2, 1.0, 0.6];
		var normalsEntity = goo.world.createEntity(normalsMeshData, normalsMaterial);
		normalsEntity.addToWorld();

		var light = new PointLight();
		var lightEntity = goo.world.createEntity('light');
		lightEntity.setComponent(new LightComponent(light));
		lightEntity.transformComponent.transform.translation.set(0, 2, 10);
		lightEntity.addToWorld();

		// camera
		var camera = new Camera(45, 1, 1, 1000);
		var cameraEntity = goo.world.createEntity('CameraEntity');
		cameraEntity.transformComponent.transform.translation.set(0, 0, 3);
		cameraEntity.transformComponent.transform.lookAt(new Vector3(0, 0, 0), Vector3.UNIT_Y);
		cameraEntity.setComponent(new CameraComponent(camera));
		cameraEntity.addToWorld();
		var scripts = new ScriptComponent();
		scripts.scripts.push(new OrbitCamControlScript({
			domElement : goo.renderer.domElement,
			spherical : new Vector3(300, Math.PI / 2, 0)
		}));
		cameraEntity.setComponent(scripts);
	}

	function init() {
		var goo = new GooRunner();
		goo.renderer.domElement.id = 'goo';
		document.body.appendChild(goo.renderer.domElement);

		latheDemo(goo);
	}

	init();
});
