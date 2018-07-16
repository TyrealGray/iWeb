//@flow
import {EXECUTE_IN_CLIENT, EXECUTE_IN_CLIENT_WITH_RETURN} from '../util/envUtil';

/**
 * a class for managing window size of nwjs client
 */
class Window {

	/**
	 * enter full screen
	 */
	static enterFullscreen() {
		EXECUTE_IN_CLIENT(() => {
			nwWinGUI.maximize();
			nwWinGUI.enterFullscreen();
		});
	}

	/**
	 * get window size on current device
	 * @returns {Object} window dimension
	 */
	static getDimension() {
		
		try {
			return EXECUTE_IN_CLIENT_WITH_RETURN(() => {
				return {
					width: parseInt(nwWinGUI.width),
					height: parseInt(nwWinGUI.height),
				};
			});
		} catch (e) {
			console.error(e);
			return {
				width: 800,
				height: 600,
			};
		}
	}
}

export default Window;