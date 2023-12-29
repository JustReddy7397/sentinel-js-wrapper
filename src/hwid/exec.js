"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = void 0;
const node_child_process_1 = require("node:child_process");
const node_util_1 = require("node:util");
exports.exec = (0, node_util_1.promisify)(node_child_process_1.exec);
