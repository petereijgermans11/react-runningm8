export enum Difficulty {
    hard = "Hard",
    medium = "Medium",
    easy = "Easy"
}
export interface Exercise {
    duration: number
    text: string
}
export interface TrainingSchema {
    title?: string
    totalTime?: number
    public?: boolean
    difficulty?: Difficulty
    exercises: Array<Exercise>
}
export interface SchemaStorageState {
    mySchemas: Array<TrainingSchema>
    otherSchemas: Array<TrainingSchema>
}
