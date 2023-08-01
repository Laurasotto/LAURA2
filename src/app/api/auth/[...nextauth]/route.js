import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';


const prisma = new PrismaClient();
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith@gmail.com" },
                password: { label: "Password", type: "password", placeholder: "******"}
            },
            async authorize(credentials, req) {
                await prisma.$connect();
                console.log(credentials);

                const userFound = await prisma.user.findUnique({
                where: { email: credentials.email }
       
                });

                if (!userFound) throw new Error("Invalid Credentials");
                console.log(userFound);

                const passwordMatch = await bcrypt.compare(credentials.password, userFound.password);
                if (!passwordMatch) throw new Error("Invalid Credentials");

                return userFound;

            }
        }),
    ], 
    callbacks: {
        jwt({account,token,user,profile,session}){
            
             if(user) token.user = user;
             return token;
        }, 
        session({session,token}){
            session.user = token.user; 
            return session
        },
    },
    pages:{
        signIn: '/login'
    }
});




export { handler as GET, handler as POST }