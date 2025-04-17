export type PageProps<Params = any, SearchParams = any> = {
  params: Params;
  searchParams: SearchParams;
};

export type DynamicParams = true | false | 'force-static' | 'force-dynamic' | 'error' | 'force-cache';

export type GenerateMetadata = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};