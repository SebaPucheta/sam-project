export declare const handler: (event: any) => Promise<{
    principalId: string;
    policyDocument: {
        Version: string;
        Statement: {
            Action: string;
            Effect: string;
            Resource: any;
        }[];
    };
    context: {
        userId: string;
    };
} | undefined>;
