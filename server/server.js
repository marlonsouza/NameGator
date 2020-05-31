import { ApolloServer } from 'apollo-server';
import dns from 'dns';

const typeDefs = `
  type Item {
    id: Int
    type: String
    description: String
  }

  type Query {
    items (type: String): [Item]
  }

  type Domain {
    name: String
    extension: String
    checkout: String,
    available: Boolean
  }

  input ItemInput{
    type: String
    description: String
  }

  type Mutation{
    saveItem(item: ItemInput): Item
    deleteItem(id: Int): Boolean
    generateDomains: [Domain]
    generateDomain(name: String): [Domain]
  }
`;

const isDomainAvailable = (url) =>
  new Promise((resolve) => dns.resolve(url, (error) => resolve(!!error)));

const items = [
  {
    id: 1,
    type: 'prefix',
    description: 'Air',
  },
  {
    id: 2,
    type: 'prefix',
    description: 'Jet',
  },
  {
    id: 3,
    type: 'prefix',
    description: 'Flight',
  },
  {
    id: 4,
    type: 'suffix',
    description: 'Hub',
  },
  {
    id: 5,
    type: 'suffix',
    description: 'Station',
  },
  {
    id: 6,
    type: 'suffix',
    description: 'Mart',
  },
];

const resolvers = {
  Query: {
    items(_, { type }) {
      return items.filter((item) => item.type === type);
    },
  },
  Mutation: {
    saveItem(_, { item }) {
      item.id = Math.floor(Math.random() * 1000);
      items.push(item);
      return item;
    },
    deleteItem(_, { id }) {
      const item = items.find((item) => item.id === id);

      if (!item) return false;
      items.splice(items.indexOf(item), 1);
      return true;
    },
    async generateDomains() {
      const domains = [];

      for (const prefix of items.filter((i) => i.type === 'prefix')) {
        for (const sufix of items.filter((i) => i.type === 'suffix')) {
          const name = prefix.description + sufix.description;

          const url = name.toLowerCase();
          const checkout = `https://checkout.hostgator.com.br/?a=add&sld=${url}&tld=.com`;
          const available = await isDomainAvailable(`${url}.com.br`);

          domains.push({
            name,
            checkout,
            available,
          });
        }
      }

      return domains;
    },
    async generateDomain(_, { name }) {
      const extensions = [".com.br", ".com", ".net", ".org"]
      const domains = [];

      for(const extension of extensions){
        const url = name.toLowerCase();
          const checkout = `https://checkout.hostgator.com.br/?a=add&sld=${url}&tld=${extension}`;
          const available = await isDomainAvailable(`${url}${extension}`);

          domains.push({
            name,
            extension,
            checkout,
            available,
          });
      }

      return domains;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen();
