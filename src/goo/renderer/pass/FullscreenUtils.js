import Quad from '../../shapes/Quad';
import Camera from '../../renderer/Camera';
import Vector3 from '../../math/Vector3';



	/**
	 * Utility class with a default setup parallel camera and fullscreen quad for fullscreen pass usage
	 */
	function FullscreenUtils() {}

	var camera = new Camera();
	camera.projectionMode = Camera.Parallel;
	camera.setFrustum(0, 1, -1, 1, 1, -1);
	camera._left.copy(Vector3.UNIT_X).negate();
	camera._up.copy(Vector3.UNIT_Y);
	camera._direction.copy(Vector3.UNIT_Z);
	camera.onFrameChange();
	FullscreenUtils.camera = camera;

	FullscreenUtils.quad = new Quad(2, 2);

	export default FullscreenUtils;