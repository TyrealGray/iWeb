//@flow
import {EXECUTE_WITHOUT_CLIENT} from './util/envUtil';
import IWeb from "./app";

EXECUTE_WITHOUT_CLIENT(() => {
	const app:IWeb = new IWeb();
	app.init();
});