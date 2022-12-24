"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryClient = exports.writeClient = void 0;
const influxdb_client_1 = require("@influxdata/influxdb-client");
const influxdb_1 = require("./keys/influxdb");
const token = influxdb_1.INFLUXDB_TOKEN;
const url = 'https://us-central1-1.gcp.cloud2.influxdata.com';
const client = new influxdb_client_1.InfluxDB({ url, token });
let org = `Performance`;
let bucket = `TVL`;
exports.writeClient = client.getWriteApi(org, bucket, 'ns');
exports.queryClient = client.getQueryApi(org);