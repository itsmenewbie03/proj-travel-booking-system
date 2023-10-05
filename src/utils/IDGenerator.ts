import type { WithId } from "mongodb";
const gen_primary_key = (document: WithId<any>[]): string => {
    const { traveler_id: last_id } = document.pop();
    const result = /(\w)(\d+)/g.exec(last_id);
    result?.shift();
    //@ts-ignore
    const [letter, num] = result;
    return `${letter}${parseInt(num) + 1}`;
};

export { gen_primary_key };
