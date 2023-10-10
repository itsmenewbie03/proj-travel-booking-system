import type { WithId } from "mongodb";
const gen_primary_key = (document: WithId<any>[]): string => {
    // fix this dumb code
    const doc = document.pop();
    const doc_keys = Object.keys(doc);
    let last_id = "";
    for (const key of doc_keys) {
        if (/\w+_id$/.test(key)) {
            console.log(`The key ${key} passed the test!`)
            last_id = doc[key];
            break;
        }
    }
    console.log(`Will increment last_id: ${last_id}`);
    const result = /(\w)(\d+)/g.exec(last_id);
    result?.shift();
    //@ts-ignore
    const [letter, num] = result;
    return `${letter}${parseInt(num) + 1}`;
};

export { gen_primary_key };
