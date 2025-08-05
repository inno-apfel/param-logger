import { 
    type User, 
    type Tank, 
    type Parameter, 
    type Observation 
} from '../../generated/prisma/client'

export type seededData = (
  User & 
  { password: string } & {
  tanks: (Tank & {
    parameters: (Parameter & {
      observations: Observation[];
    })[];
  })[];
})[];

export type createEntityData = {
  name: string;
  numToCreate: number;
  createEntityFunc: Function;
}[]

export async function generateSeedData(createEntityData: createEntityData, parent_id?: string): Promise<seededData> {

  let items = [];
  const currItem = createEntityData[0];
  for (let i = 0; i < currItem.numToCreate; i++){

    // create item
    const item = parent_id
      ? await currItem.createEntityFunc(parent_id)
      : await currItem.createEntityFunc()

    // generate children if exist else return current items
    if (createEntityData.length > 1){
      const nextItem = createEntityData.slice(1)
      const children = await generateSeedData(nextItem, item.id); // drop first element
      // store children as direct access
      let itemWithChild = {
        ...item,
        [nextItem[0].name]: children
      }
      items.push(itemWithChild)
    }
    else{
      items.push(item)
    }
  }
  return items
}