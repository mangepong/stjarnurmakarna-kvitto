import { Arbeten, KvittoModel } from "../shared/KvittoModel";

export function modelToApi(model: KvittoModel) {
    let temp = model;
    temp.arbeten = transformArbeten(temp.arbeten);
    temp.inDatum = temp.inDatum.split(" ")[0];
    temp.levDatum = temp.inDatum.split(" ")[0];
    return temp;
}

function transformArbeten(arbeten: Array<any>): Array<Arbeten> {
    let temp = [];
    for (let i = 0; i < arbeten.length; i++) {
        if (arbeten[i].checked) {
            temp.push(arbeten[i])
        }
    }
    return temp;
}