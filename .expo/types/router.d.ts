/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/antiquity`; params?: Router.UnknownInputParams; } | { pathname: `/authentication`; params?: Router.UnknownInputParams; } | { pathname: `/business`; params?: Router.UnknownInputParams; } | { pathname: `/care`; params?: Router.UnknownInputParams; } | { pathname: `/dpayment`; params?: Router.UnknownInputParams; } | { pathname: `/estate`; params?: Router.UnknownInputParams; } | { pathname: `/fashion`; params?: Router.UnknownInputParams; } | { pathname: `/food`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/membership`; params?: Router.UnknownInputParams; } | { pathname: `/partners`; params?: Router.UnknownInputParams; } | { pathname: `/personality`; params?: Router.UnknownInputParams; } | { pathname: `/politics`; params?: Router.UnknownInputParams; } | { pathname: `/register`; params?: Router.UnknownInputParams; } | { pathname: `/sports`; params?: Router.UnknownInputParams; } | { pathname: `/supabase`; params?: Router.UnknownInputParams; } | { pathname: `/travel`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/account` | `/account`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/chat` | `/chat`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/home` | `/home`; params?: Router.UnknownInputParams; } | { pathname: `/+not-found`, params: Router.UnknownInputParams & {  } };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/antiquity`; params?: Router.UnknownOutputParams; } | { pathname: `/authentication`; params?: Router.UnknownOutputParams; } | { pathname: `/business`; params?: Router.UnknownOutputParams; } | { pathname: `/care`; params?: Router.UnknownOutputParams; } | { pathname: `/dpayment`; params?: Router.UnknownOutputParams; } | { pathname: `/estate`; params?: Router.UnknownOutputParams; } | { pathname: `/fashion`; params?: Router.UnknownOutputParams; } | { pathname: `/food`; params?: Router.UnknownOutputParams; } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/membership`; params?: Router.UnknownOutputParams; } | { pathname: `/partners`; params?: Router.UnknownOutputParams; } | { pathname: `/personality`; params?: Router.UnknownOutputParams; } | { pathname: `/politics`; params?: Router.UnknownOutputParams; } | { pathname: `/register`; params?: Router.UnknownOutputParams; } | { pathname: `/sports`; params?: Router.UnknownOutputParams; } | { pathname: `/supabase`; params?: Router.UnknownOutputParams; } | { pathname: `/travel`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/account` | `/account`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/chat` | `/chat`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/home` | `/home`; params?: Router.UnknownOutputParams; } | { pathname: `/+not-found`, params: Router.UnknownOutputParams & {  } };
      href: Router.RelativePathString | Router.ExternalPathString | `/antiquity${`?${string}` | `#${string}` | ''}` | `/authentication${`?${string}` | `#${string}` | ''}` | `/business${`?${string}` | `#${string}` | ''}` | `/care${`?${string}` | `#${string}` | ''}` | `/dpayment${`?${string}` | `#${string}` | ''}` | `/estate${`?${string}` | `#${string}` | ''}` | `/fashion${`?${string}` | `#${string}` | ''}` | `/food${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `/membership${`?${string}` | `#${string}` | ''}` | `/partners${`?${string}` | `#${string}` | ''}` | `/personality${`?${string}` | `#${string}` | ''}` | `/politics${`?${string}` | `#${string}` | ''}` | `/register${`?${string}` | `#${string}` | ''}` | `/sports${`?${string}` | `#${string}` | ''}` | `/supabase${`?${string}` | `#${string}` | ''}` | `/travel${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/account${`?${string}` | `#${string}` | ''}` | `/account${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/chat${`?${string}` | `#${string}` | ''}` | `/chat${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/home${`?${string}` | `#${string}` | ''}` | `/home${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/antiquity`; params?: Router.UnknownInputParams; } | { pathname: `/authentication`; params?: Router.UnknownInputParams; } | { pathname: `/business`; params?: Router.UnknownInputParams; } | { pathname: `/care`; params?: Router.UnknownInputParams; } | { pathname: `/dpayment`; params?: Router.UnknownInputParams; } | { pathname: `/estate`; params?: Router.UnknownInputParams; } | { pathname: `/fashion`; params?: Router.UnknownInputParams; } | { pathname: `/food`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/membership`; params?: Router.UnknownInputParams; } | { pathname: `/partners`; params?: Router.UnknownInputParams; } | { pathname: `/personality`; params?: Router.UnknownInputParams; } | { pathname: `/politics`; params?: Router.UnknownInputParams; } | { pathname: `/register`; params?: Router.UnknownInputParams; } | { pathname: `/sports`; params?: Router.UnknownInputParams; } | { pathname: `/supabase`; params?: Router.UnknownInputParams; } | { pathname: `/travel`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/account` | `/account`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/chat` | `/chat`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/home` | `/home`; params?: Router.UnknownInputParams; } | `/+not-found` | { pathname: `/+not-found`, params: Router.UnknownInputParams & {  } };
    }
  }
}
