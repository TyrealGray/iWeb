//@flow
import $ from 'jquery';
import T_modalTemplate from '../../template/modalTemplate.html';

type TemplateLoaderInitPropsType = {
	height: number,
	width: number,
	directory: string,
}

/**
 * a class for managing template in app
 */
class TemplateLoader {

	_height: number;
	_width: number;
	_directory: string;

	/**
	 * create template loader
	 */
	constructor() {
		this._height = 0;
		this._width = 0;
	}

	/**
	 * init loader
	 * @param props {Object}
	 * @param props.height {Object} the height of template view
	 * @param props.width {Object} the width of template view
	 */
	init(props: TemplateLoaderInitPropsType) {
		this._height = props.height;
		this._width = props.width;
		this._directory = props.directory;

		const templateView = document.getElementById('templateView');

		if (templateView && templateView instanceof HTMLIFrameElement) {
			templateView.setAttribute('width', this._width.toString());
			templateView.setAttribute('height', parseFloat(this._height * 0.9).toString());
			templateView.setAttribute('src', `file:///${this._directory}/index.html`);
			templateView.onload = () => {
				this._createModifyElementEventListener(templateView);
				this._initSaveButton(templateView);
			};
		}
	}

	/**
	 * make every html element editable and add event listener to a tag
	 * @private
	 */
	_createModifyElementEventListener(templateView: HTMLIFrameElement) {

		const iframeDocument: any = templateView.contentWindow.document;
		iframeDocument.body.setAttribute('contenteditable', true);

		const aTags = iframeDocument.querySelectorAll('a');
		for (const aTag of aTags) {
			aTag.addEventListener('click', this._aTageClickListener);
		}
	}

	_aTageClickListener(e) {
        $('#ModalContainer').html(T_modalTemplate());

        const aTagContentInput = document.getElementById('aTagContentInput');

        if(aTagContentInput && aTagContentInput instanceof HTMLInputElement){

            aTagContentInput.value = e.target.innerHTML;

            aTagContentInput.addEventListener('change', () => {
                e.target.innerHTML = aTagContentInput.value;
            });

            $('#modalCenter').modal();
        }
	}

	/**
	 * show save button after init
	 * @param templateView {HTMLIFrameElement}
	 * @private
	 */
	_initSaveButton(templateView: HTMLIFrameElement) {
		const saveButton: HTMLElement | null = document.getElementById('saveButton');

		if (!saveButton) {
			return;
		}

		saveButton.removeAttribute('style');

		const iframeDocument: any = templateView.contentWindow.document;

		saveButton.addEventListener('click', () => {
			iframeDocument.body.removeAttribute('contenteditable');

            const aTags = iframeDocument.querySelectorAll('a');
            for (const aTag of aTags) {
                aTag.removeEventListener('click', this._aTageClickListener);
            }

			this._saveChanges(iframeDocument);
		});
	}

	/**
	 * save current change back to template
	 * @param iframeDocument {HTMLDocument}
	 * @private
	 */
	_saveChanges(iframeDocument: any) {
		fileSystem.writeFileSync(`${this._directory}/index.html`, iframeDocument.documentElement.outerHTML);
		iframeDocument.body.setAttribute('contenteditable', true);
		alert('changes saved');
	}
}

export default TemplateLoader;