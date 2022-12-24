import { InfluxDB } from '@influxdata/influxdb-client'
import { INFLUXDB_TOKEN } from './keys/influxdb'

const token = INFLUXDB_TOKEN
const url = 'https://us-central1-1.gcp.cloud2.influxdata.com'

const client = new InfluxDB({url, token})

let org = `Performance`
let bucket = `TVL`

export const writeClient = client.getWriteApi(org, bucket, 'ns')
export const queryClient = client.getQueryApi(org)