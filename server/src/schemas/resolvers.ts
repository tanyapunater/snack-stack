// import { Thought, User } from '../models/index.js';
// import { signToken, AuthenticationError } from '../utils/auth.js'; 

// // Define types for the arguments
// interface AddUserArgs {
//   input:{
//     username: string;
//     email: string;
//     password: string;
//   }
// }

// interface LoginUserArgs {
//   email: string;
//   password: string;
// }

// interface UserArgs {
//   username: string;
// }

// interface ThoughtArgs {
//   thoughtId: string;
// }

// interface AddThoughtArgs {
//   input:{
//     thoughtText: string;
//     thoughtAuthor: string;
//   }
// }

// interface AddCommentArgs {
//   thoughtId: string;
//   commentText: string;
// }

// interface RemoveCommentArgs {
//   thoughtId: string;
//   commentId: string;
// }

// const resolvers = {
//   Query: {
//     users: async () => {
//       return User.find().populate('thoughts');
//     },
//     user: async (_parent: any, { username }: UserArgs) => {
//       return User.findOne({ username }).populate('thoughts');
//     },
//     thoughts: async () => {
//       return await Thought.find().sort({ createdAt: -1 });
//     },
//     thought: async (_parent: any, { thoughtId }: ThoughtArgs) => {
//       return await Thought.findOne({ _id: thoughtId });
//     },
//     // Query to get the authenticated user's information
//     // The 'me' query relies on the context to check if the user is authenticated
//     me: async (_parent: any, _args: any, context: any) => {
//       // If the user is authenticated, find and return the user's information along with their thoughts
//       if (context.user) {
//         return User.findOne({ _id: context.user._id }).populate('thoughts');
//       }
//       // If the user is not authenticated, throw an AuthenticationError
//       throw new AuthenticationError('Could not authenticate user.');
//     },
//   },
//   Mutation: {
//     addUser: async (_parent: any, { input }: AddUserArgs) => {
//       // Create a new user with the provided username, email, and password
//       const user = await User.create({ ...input });
    
//       // Sign a token with the user's information
//       const token = signToken(user.username, user.email, user._id);
    
//       // Return the token and the user
//       return { token, user };
//     },
    
//     login: async (_parent: any, { email, password }: LoginUserArgs) => {
//       // Find a user with the provided email
//       const user = await User.findOne({ email });
    
//       // If no user is found, throw an AuthenticationError
//       if (!user) {
//         throw new AuthenticationError('Could not authenticate user.');
//       }
    
//       // Check if the provided password is correct
//       const correctPw = await user.isCorrectPassword(password);
    
//       // If the password is incorrect, throw an AuthenticationError
//       if (!correctPw) {
//         throw new AuthenticationError('Could not authenticate user.');
//       }
    
//       // Sign a token with the user's information
//       const token = signToken(user.username, user.email, user._id);
    
//       // Return the token and the user
//       return { token, user };
//     },
//     addThought: async (_parent: any, { input }: AddThoughtArgs, context: any) => {
//       if (context.user) {
//         const thought = await Thought.create({ ...input });

//         await User.findOneAndUpdate(
//           { _id: context.user._id },
//           { $addToSet: { thoughts: thought._id } }
//         );

//         return thought;
//       }
//       throw AuthenticationError;
//       ('You need to be logged in!');
//     },
//     addComment: async (_parent: any, { thoughtId, commentText }: AddCommentArgs, context: any) => {
//       if (context.user) {
//         return Thought.findOneAndUpdate(
//           { _id: thoughtId },
//           {
//             $addToSet: {
//               comments: { commentText, commentAuthor: context.user.username },
//             },
//           },
//           {
//             new: true,
//             runValidators: true,
//           }
//         );
//       }
//       throw AuthenticationError;
//     },
//     removeThought: async (_parent: any, { thoughtId }: ThoughtArgs, context: any) => {
//       if (context.user) {
//         const thought = await Thought.findOneAndDelete({
//           _id: thoughtId,
//           thoughtAuthor: context.user.username,
//         });

//         if(!thought){
//           throw AuthenticationError;
//         }

//         await User.findOneAndUpdate(
//           { _id: context.user._id },
//           { $pull: { thoughts: thought._id } }
//         );

//         return thought;
//       }
//       throw AuthenticationError;
//     },
//     removeComment: async (_parent: any, { thoughtId, commentId }: RemoveCommentArgs, context: any) => {
//       if (context.user) {
//         return Thought.findOneAndUpdate(
//           { _id: thoughtId },
//           {
//             $pull: {
//               comments: {
//                 _id: commentId,
//                 commentAuthor: context.user.username,
//               },
//             },
//           },
//           { new: true }
//         );
//       }
//       throw AuthenticationError;
//     },
//   },
// };

// export default resolvers;



import { Thought, User, Recipe } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js'; 

// Define types for the arguments
interface AddUserArgs {
  input: {
    username: string;
    email: string;
    password: string;
  }
}

interface LoginUserArgs {
  email: string;
  password: string;
}

interface UserArgs {
  username: string;
}

interface ThoughtArgs {
  thoughtId: string;
}

interface AddThoughtArgs {
  input: {
    thoughtText: string;
    thoughtAuthor: string;
  }
}

interface AddCommentArgs {
  thoughtId: string;
  commentText: string;
}

interface RemoveCommentArgs {
  thoughtId: string;
  commentId: string;
}

// Recipe interfaces
interface RecipeArgs {
  id: string;
}

interface RecipeSearchArgs {
  category?: string;
  search?: string;
}

interface AddRecipeArgs {
  input: {
    title: string;
    description?: string;
    ingredients: string[];
    instructions: string[];
    category: string;
  }
}

interface UpdateRecipeArgs {
  id: string;
  input: {
    title?: string;
    description?: string;
    ingredients?: string[];
    instructions?: string[];
    category?: string;
  }
}

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('thoughts');
    },
    user: async (_parent: any, { username }: UserArgs) => {
      return User.findOne({ username }).populate('thoughts');
    },
    thoughts: async () => {
      return await Thought.find().sort({ createdAt: -1 });
    },
    thought: async (_parent: any, { thoughtId }: ThoughtArgs) => {
      return await Thought.findOne({ _id: thoughtId });
    },
    me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('thoughts');
      }
      throw new AuthenticationError('Could not authenticate user.');
    },
    // Recipe queries
    getRecipes: async (_parent: any, { category, search }: RecipeSearchArgs) => {
      const query: any = {};
      
      if (category) {
        query.category = category;
      }
      
      if (search) {
        query.$text = { $search: search };
      }
      
      return await Recipe.find(query).populate('createdBy');
    },
    getRecipeById: async (_parent: any, { id }: RecipeArgs) => {
      return await Recipe.findById(id).populate('createdBy');
    }
  },
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      const user = await User.create({ ...input });
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    
    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      const user = await User.findOne({ email });
      
      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }
      
      const correctPw = await user.isCorrectPassword(password);
      
      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }
      
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    
    addThought: async (_parent: any, { input }: AddThoughtArgs, context: any) => {
      if (context.user) {
        const thought = await Thought.create({ ...input });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { thoughts: thought._id } }
        );

        return thought;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    addComment: async (_parent: any, { thoughtId, commentText }: AddCommentArgs, context: any) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $addToSet: {
              comments: { commentText }  // Make sure this matches your schema
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    removeThought: async (_parent: any, { thoughtId }: ThoughtArgs, context: any) => {
      if (context.user) {
        const thought = await Thought.findOneAndDelete({
          _id: thoughtId,
          thoughtAuthor: context.user.username,
        });

        if (!thought) {
          throw new AuthenticationError('Thought not found or you are not authorized to delete it');
        }

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { thoughts: thought._id } }
        );

        return thought;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    removeComment: async (_parent: any, { thoughtId, commentId }: RemoveCommentArgs, context: any) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $pull: {
              comments: {
                _id: commentId
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    // Recipe mutations
    addRecipe: async (_parent: any, { input }: AddRecipeArgs, context: any) => {
      if (context.user) {
        const recipe = await Recipe.create({
          ...input,
          createdBy: context.user._id
        });
        
        return await Recipe.findById(recipe._id).populate('createdBy');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    updateRecipe: async (_parent: any, { id, input }: UpdateRecipeArgs, context: any) => {
      if (context.user) {
        const recipe = await Recipe.findOneAndUpdate(
          { _id: id, createdBy: context.user._id },
          { $set: input },
          { new: true, runValidators: true }
        ).populate('createdBy');
        
        if (!recipe) {
          throw new AuthenticationError('Recipe not found or you are not authorized to update it');
        }
        
        return recipe;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    deleteRecipe: async (_parent: any, { id }: RecipeArgs, context: any) => {
      if (context.user) {
        const recipe = await Recipe.findOneAndDelete({
          _id: id,
          createdBy: context.user._id
        });
        
        if (!recipe) {
          throw new AuthenticationError('Recipe not found or you are not authorized to delete it');
        }
        
        return true;
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  },
};

export default resolvers;