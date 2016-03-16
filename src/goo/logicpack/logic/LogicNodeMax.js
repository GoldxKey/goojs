import LogicLayer from './LogicLayer';
import LogicNode from './LogicNode';
import LogicNodes from './LogicNodes';
import LogicInterface from './LogicInterface'

/**
 * Logic node that computes the max of two inputs.
 * @private
 */
function LogicNodeMax() {
	LogicNode.call(this);
	this.logicInterface = LogicNodeMax.logicInterface;
	this.type = 'LogicNodeMax';
}

LogicNodeMax.prototype = Object.create(LogicNode.prototype);
LogicNodeMax.editorName = 'Max';

LogicNodeMax.prototype.onInputChanged = function (instDesc) {
	var val1 = LogicLayer.readPort(instDesc, LogicNodeMax.inportX);
	var val2 = LogicLayer.readPort(instDesc, LogicNodeMax.inportY);
	var out = Math.max(val1, val2);

	LogicLayer.writeValue(instDesc, LogicNodeMax.outportSum, out);
};

LogicNodeMax.logicInterface = new LogicInterface();
LogicNodeMax.outportSum = LogicNodeMax.logicInterface.addOutputProperty('max', 'float');
LogicNodeMax.inportX = LogicNodeMax.logicInterface.addInputProperty('x', 'float', 0);
LogicNodeMax.inportY = LogicNodeMax.logicInterface.addInputProperty('y', 'float', 0);

LogicNodes.registerType('LogicNodeMax', LogicNodeMax);

export default LogicNodeMax;