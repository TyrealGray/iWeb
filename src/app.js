//@flow
import 'bootstrap';
import Window from "./module/window";
import TemplatePathInput from "./core/templatePathInput";

/**
 * iWeb app's class
 */
class IWeb {

	_templatePathInput: TemplatePathInput;

	/**
	 * iWeb app constructor
	 */
	constructor() {
		this._templatePathInput = new TemplatePathInput;
	}

	/**
	 * init app
	 */
	init() {
		Window.enterFullscreen();

		/**
		 * need 1 second for window becoming full screen
		 */
		setTimeout(() => {
			this._templatePathInput.init();
		}, 1000);
	}
}

export default IWeb;