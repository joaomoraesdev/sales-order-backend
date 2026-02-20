export type FullRequestParams<ExpectedResult> = Request & {
    results: ExpectedResult;
};
