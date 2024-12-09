import { XMLParser } from 'fast-xml-parser'

export function xmlToJson(xmlDoc: string) {
	const parser = new XMLParser()
	let jObj = parser.parse(xmlDoc)
	return jObj
}
