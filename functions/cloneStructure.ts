export default function cloneStructure(obj: any) {
    return JSON.parse(JSON.stringify(obj))
}