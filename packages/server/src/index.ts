import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  enum QuestionType {
    TEXT
    MULTIPLE_CHOICE
    CHECKBOX
    DATE
  }

  type Question {
    id: ID!
    text: String!
    type: QuestionType!
    options: [String] # Для MULTIPLE_CHOICE и CHECKBOX
  }

  input QuestionInput {
    text: String!
    type: QuestionType!
    options: [String]
  }

  type Form {
    id: ID!
    title: String!
    description: String
    questions: [Question]
  }

  type Answer {
    questionId: ID!
    value: String!
  }

  input AnswerInput {
    questionId: ID!
    value: String!
  }

  type Response {
    id: ID!
    formId: ID!
    answers: [Answer]
  }

  type Query {
    forms: [Form!]!
    form(id: ID!): Form
    responses(formId: ID!): [Response!]!
  }

  type Mutation {
    createForm(title: String!, description: String, questions: [QuestionInput]): Form
    submitResponse(formId: ID!, answers: [AnswerInput]): Response
  }
`;

const db = {
  forms: [] as any[],
  responses: [] as any[]
};

const resolvers = {
  Query: {
    forms: () => db.forms,
    form: (_: any, { id }: { id: string }) => db.forms.find(f => f.id === id),
    responses: (_: any, { formId }: { formId: string }) => 
      db.responses.filter(r => r.formId === formId),
  },
  Mutation: {
    createForm: (_: any, { title, description, questions }: any) => {
      const newForm = {
        id: String(db.forms.length + 1),
        title,
        description,
        questions: questions?.map((q: any, index: number) => ({ ...q, id: String(index + 1) })) || []
      };
      db.forms.push(newForm);
      return newForm;
    },
    submitResponse: (_: any, { formId, answers }: any) => {
      const newResponse = {
        id: String(db.responses.length + 1),
        formId,
        answers
      };
      db.responses.push(newResponse);
      return newResponse;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4000 }).then(({ url }: { url: string }) => {
  console.log(`🚀 The server is running at the address: ${url}`);
});