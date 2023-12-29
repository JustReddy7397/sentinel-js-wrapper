import {getHWID} from "../hwid";

export default class Hwid {

    static async getHwid() : Promise<string> {
        return await getHWID();
    }

}