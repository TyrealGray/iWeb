//@flow
import {EXECUTE_IN_CLIENT} from './util/envUtil';
import IWeb from "./app";
import {DevConsole} from './util/errorUtil';

EXECUTE_IN_CLIENT(() => {
	if (process.env.NODE_ENV !== 'production') {
		new DevConsole();
	}

	const app: IWeb = new IWeb();
	app.init();
});