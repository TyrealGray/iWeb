//@flow
import TemplateLoader from "./templateLoader";
import Window from "../module/window";

/**
 * a class for init template loading input button in app
 */
class TemplatePathInput {

	_templateLoader: TemplateLoader;

	/**
	 * TemplatePathInput's constructor
	 */
	constructor() {
		this._templateLoader = new TemplateLoader;
	}

	/**
	 * init input button
	 */
	init() {
		const templatePathInput = document.getElementById('templatePathInput');

		if(templatePathInput && templatePathInput instanceof HTMLInputElement){

			templatePathInput.addEventListener('change', (event: any) => {
				let files = event.target.files;
				if (files.length !== 0) {
					let pathStr = `${files[0].path}`;
					const {width, height} = Window.getDimension();
					this._templateLoader.init({
						width: width,
						height: height,
						directory: pathStr.replace(`${files[0].name}`, '')
					});
				}
			});
		}
	}
}

export default TemplatePathInput;