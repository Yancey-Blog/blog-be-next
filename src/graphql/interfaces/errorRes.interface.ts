interface GraphQLErrorItem {
  message: string
  path: string[]
  timestamp: string
}

export type GraphQLError = GraphQLErrorItem[]
