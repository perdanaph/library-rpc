/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AddBookImport } from './routes/add-book'
import { Route as IndexImport } from './routes/index'
import { Route as EditBookBookIdImport } from './routes/edit-book.$bookId'

// Create/Update Routes

const AddBookRoute = AddBookImport.update({
  id: '/add-book',
  path: '/add-book',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const EditBookBookIdRoute = EditBookBookIdImport.update({
  id: '/edit-book/$bookId',
  path: '/edit-book/$bookId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/add-book': {
      id: '/add-book'
      path: '/add-book'
      fullPath: '/add-book'
      preLoaderRoute: typeof AddBookImport
      parentRoute: typeof rootRoute
    }
    '/edit-book/$bookId': {
      id: '/edit-book/$bookId'
      path: '/edit-book/$bookId'
      fullPath: '/edit-book/$bookId'
      preLoaderRoute: typeof EditBookBookIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/add-book': typeof AddBookRoute
  '/edit-book/$bookId': typeof EditBookBookIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/add-book': typeof AddBookRoute
  '/edit-book/$bookId': typeof EditBookBookIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/add-book': typeof AddBookRoute
  '/edit-book/$bookId': typeof EditBookBookIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/add-book' | '/edit-book/$bookId'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/add-book' | '/edit-book/$bookId'
  id: '__root__' | '/' | '/add-book' | '/edit-book/$bookId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AddBookRoute: typeof AddBookRoute
  EditBookBookIdRoute: typeof EditBookBookIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AddBookRoute: AddBookRoute,
  EditBookBookIdRoute: EditBookBookIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/add-book",
        "/edit-book/$bookId"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/add-book": {
      "filePath": "add-book.tsx"
    },
    "/edit-book/$bookId": {
      "filePath": "edit-book.$bookId.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
