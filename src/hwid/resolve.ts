import { platform } from 'node:process'
import { linuxHWID } from './linux'
import {win32HWID} from "./win32";

export type ResolverFn = () => Promise<string>

export const resolveID: ResolverFn = async () => {
    switch (platform) {
        case "win32":
            return win32HWID()
        case 'linux':
            return linuxHWID()
        default:
            throw new Error('unsupported platform')
    }
}