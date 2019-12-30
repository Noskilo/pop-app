import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any,
};



export type Address = {
   __typename?: 'Address',
  id: Scalars['ID'],
  name: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  building: Scalars['String'],
  street: Scalars['String'],
  floor: Scalars['String'],
  locality: Scalars['String'],
  phone: Scalars['String'],
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type Attribute = {
   __typename?: 'Attribute',
  id: Scalars['ID'],
  name: Scalars['String'],
  value: Scalars['String'],
  attributeGroup: AttributeGroup,
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type AttributeGroup = {
   __typename?: 'AttributeGroup',
  id: Scalars['ID'],
  name: Scalars['String'],
  displayName: Scalars['String'],
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  attributes?: Maybe<Array<Attribute>>,
};

export type Carted = {
   __typename?: 'Carted',
  id: Scalars['ID'],
  skuId: Scalars['ID'],
  productId: Scalars['ID'],
  itemQuantity: Scalars['Int'],
  product: Product,
  sku: Sku,
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type Category = {
   __typename?: 'Category',
  id: Scalars['ID'],
  title: Scalars['String'],
  description: Scalars['String'],
  parent?: Maybe<Category>,
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  children: Array<Category>,
  products: Array<Product>,
  productCount: Scalars['Int'],
  hasChildren: Scalars['Boolean'],
};

export type CategoryViews = {
   __typename?: 'CategoryViews',
  id: Scalars['ID'],
  views: Scalars['Int'],
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type Comment = {
   __typename?: 'Comment',
  id: Scalars['ID'],
  content: Scalars['String'],
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};


export type Discarded = {
   __typename?: 'Discarded',
  id: Scalars['ID'],
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type Dispute = {
   __typename?: 'Dispute',
  id: Scalars['ID'],
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type DisputeAction = {
   __typename?: 'DisputeAction',
  id: Scalars['ID'],
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type DisputeType = {
   __typename?: 'DisputeType',
  id: Scalars['ID'],
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type District = {
   __typename?: 'District',
  id: Scalars['ID'],
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type HelpfulReview = {
   __typename?: 'HelpfulReview',
  id: Scalars['ID'],
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type Image = {
   __typename?: 'Image',
  id: Scalars['ID'],
  imageUrl: Scalars['String'],
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type Invoice = {
   __typename?: 'Invoice',
  id: Scalars['ID'],
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type InvoiceItem = {
   __typename?: 'InvoiceItem',
  id: Scalars['ID'],
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type LikeRating = {
   __typename?: 'LikeRating',
  id: Scalars['ID'],
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  updateProduct: Product,
};


export type MutationUpdateProductArgs = {
  name: Scalars['String'],
  id: Scalars['ID']
};

export type Order = {
   __typename?: 'Order',
  id: Scalars['ID'],
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type OrderState = {
   __typename?: 'OrderState',
  id: Scalars['ID'],
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type PaymentOption = {
   __typename?: 'PaymentOption',
  id: Scalars['ID'],
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type PermissionCode = {
   __typename?: 'PermissionCode',
  id: Scalars['ID'],
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type PermissionPresetHeader = {
   __typename?: 'PermissionPresetHeader',
  id: Scalars['ID'],
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type PriceRange = {
   __typename?: 'PriceRange',
  min: Scalars['Float'],
  max: Scalars['Float'],
};

export type Product = {
   __typename?: 'Product',
  id: Scalars['ID'],
  name: Scalars['String'],
  description: Scalars['String'],
  sale?: Maybe<Scalars['Int']>,
  subUnit: Scalars['String'],
  reference: Scalars['String'],
  visible: Scalars['Boolean'],
  type: Scalars['String'],
  categories?: Maybe<Array<Category>>,
  tags?: Maybe<Array<Tag>>,
  cartedItems: Array<Carted>,
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  inStock: Scalars['Boolean'],
  skus: Array<Sku>,
  store: Store,
  priceRange?: Maybe<PriceRange>,
  images: Array<Image>,
};


export type ProductCategoriesArgs = {
  tree?: Maybe<Scalars['Boolean']>
};


export type ProductImagesArgs = {
  thumbnailOnly?: Maybe<Scalars['Boolean']>
};

export type ProductImage = {
   __typename?: 'ProductImage',
  productId: Scalars['ID'],
  imageId: Scalars['ID'],
  type: Scalars['String'],
};

export type ProductViews = {
   __typename?: 'ProductViews',
  id: Scalars['ID'],
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type Query = {
   __typename?: 'Query',
  products: Array<Product>,
  product: Product,
  categories: Array<Category>,
  categoryChildrenOf: Array<Category>,
  addresses: Array<Address>,
  attributes: Array<Attribute>,
  me?: Maybe<User>,
  hello: Scalars['String'],
  login?: Maybe<Scalars['String']>,
  refreshToken?: Maybe<Scalars['String']>,
  stores: Array<Store>,
};


export type QueryProductsArgs = {
  search?: Maybe<Scalars['String']>
};


export type QueryProductArgs = {
  id: Scalars['ID']
};


export type QueryCategoriesArgs = {
  limit?: Maybe<Scalars['Float']>,
  tree?: Maybe<Scalars['Boolean']>
};


export type QueryCategoryChildrenOfArgs = {
  parentId: Scalars['Int']
};


export type QueryLoginArgs = {
  password: Scalars['String'],
  username: Scalars['String']
};


export type QueryStoresArgs = {
  search?: Maybe<Scalars['String']>
};

export type Review = {
   __typename?: 'Review',
  id: Scalars['ID'],
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type Sku = {
   __typename?: 'Sku',
  id: Scalars['ID'],
  reference?: Maybe<Scalars['String']>,
  stock: Scalars['Int'],
  price: Scalars['Float'],
  currency: Scalars['String'],
  product: Product,
  cartedItems: Array<Carted>,
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  attributes?: Maybe<Array<Attribute>>,
};

export type Store = {
   __typename?: 'Store',
  id: Scalars['ID'],
  name: Scalars['String'],
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  logo?: Maybe<Image>,
  banner?: Maybe<Image>,
};

export type StoreOrder = {
   __typename?: 'StoreOrder',
  id: Scalars['ID'],
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type Subscription = {
   __typename?: 'Subscription',
  test: Scalars['String'],
};

export type Tag = {
   __typename?: 'Tag',
  id: Scalars['ID'],
  value: Scalars['String'],
  products?: Maybe<Array<Product>>,
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  username: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  name: Scalars['String'],
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type Wish = {
   __typename?: 'Wish',
  id: Scalars['ID'],
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type CategoryTreeQueryVariables = {};


export type CategoryTreeQuery = (
  { __typename?: 'Query' }
  & { categories: Array<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'title' | 'productCount'>
    & { children: Array<(
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'title' | 'productCount'>
      & { children: Array<(
        { __typename?: 'Category' }
        & Pick<Category, 'id' | 'title' | 'productCount'>
        & { children: Array<(
          { __typename?: 'Category' }
          & Pick<Category, 'id' | 'title' | 'productCount'>
        )> }
      )> }
    )> }
  )> }
);

export type RootCategoriesQueryVariables = {};


export type RootCategoriesQuery = (
  { __typename?: 'Query' }
  & { categories: Array<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'title'>
    & { products: Array<(
      { __typename?: 'Product' }
      & Pick<Product, 'id' | 'name' | 'sale' | 'inStock'>
      & { store: (
        { __typename?: 'Store' }
        & Pick<Store, 'name'>
        & { logo: Maybe<(
          { __typename?: 'Image' }
          & Pick<Image, 'imageUrl'>
        )> }
      ), priceRange: Maybe<(
        { __typename?: 'PriceRange' }
        & Pick<PriceRange, 'min' | 'max'>
      )>, images: Array<(
        { __typename?: 'Image' }
        & Pick<Image, 'imageUrl'>
      )> }
    )> }
  )> }
);

export type CategoryChildrenOfQueryVariables = {
  parentId: Scalars['Int']
};


export type CategoryChildrenOfQuery = (
  { __typename?: 'Query' }
  & { categoryChildrenOf: Array<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'title' | 'productCount' | 'hasChildren'>
  )> }
);

export type AllProductsQueryVariables = {};


export type AllProductsQuery = (
  { __typename?: 'Query' }
  & { products: Array<(
    { __typename?: 'Product' }
    & Pick<Product, 'name' | 'description'>
  )> }
);

export type SearchProductsQueryVariables = {
  search: Scalars['String']
};


export type SearchProductsQuery = (
  { __typename?: 'Query' }
  & { products: Array<(
    { __typename?: 'Product' }
    & Pick<Product, 'name' | 'description'>
  )> }
);

export type ProductQueryVariables = {
  id: Scalars['ID']
};


export type ProductQuery = (
  { __typename?: 'Query' }
  & { product: (
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'name' | 'description' | 'sale' | 'inStock'>
    & { images: Array<(
      { __typename?: 'Image' }
      & Pick<Image, 'imageUrl'>
    )>, priceRange: Maybe<(
      { __typename?: 'PriceRange' }
      & Pick<PriceRange, 'min' | 'max'>
    )>, store: (
      { __typename?: 'Store' }
      & Pick<Store, 'name'>
      & { logo: Maybe<(
        { __typename?: 'Image' }
        & Pick<Image, 'imageUrl'>
      )> }
    ), skus: Array<(
      { __typename?: 'Sku' }
      & Pick<Sku, 'id' | 'stock' | 'price' | 'currency'>
      & { attributes: Maybe<Array<(
        { __typename?: 'Attribute' }
        & Pick<Attribute, 'id' | 'name'>
        & { attributeGroup: (
          { __typename?: 'AttributeGroup' }
          & Pick<AttributeGroup, 'id' | 'name'>
        ) }
      )>> }
    )>, categories: Maybe<Array<(
      { __typename?: 'Category' }
      & Pick<Category, 'title'>
      & { children: Array<(
        { __typename?: 'Category' }
        & Pick<Category, 'title'>
        & { children: Array<(
          { __typename?: 'Category' }
          & Pick<Category, 'title'>
        )> }
      )> }
    )>> }
  ) }
);

export type SearchStoresQueryVariables = {};


export type SearchStoresQuery = (
  { __typename?: 'Query' }
  & { stores: Array<(
    { __typename?: 'Store' }
    & Pick<Store, 'id' | 'name'>
    & { banner: Maybe<(
      { __typename?: 'Image' }
      & Pick<Image, 'imageUrl'>
    )> }
  )> }
);


export const CategoryTreeDocument = gql`
    query CategoryTree {
  categories(tree: true) {
    id
    title
    productCount
    children {
      id
      title
      productCount
      children {
        id
        title
        productCount
        children {
          id
          title
          productCount
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CategoryTreeGQL extends Apollo.Query<CategoryTreeQuery, CategoryTreeQueryVariables> {
    document = CategoryTreeDocument;
    
  }
export const RootCategoriesDocument = gql`
    query RootCategories {
  categories(tree: true) {
    id
    title
    products {
      id
      name
      sale
      inStock
      store {
        name
        logo {
          imageUrl
        }
      }
      priceRange {
        min
        max
      }
      images(thumbnailOnly: true) {
        imageUrl
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RootCategoriesGQL extends Apollo.Query<RootCategoriesQuery, RootCategoriesQueryVariables> {
    document = RootCategoriesDocument;
    
  }
export const CategoryChildrenOfDocument = gql`
    query CategoryChildrenOf($parentId: Int!) {
  categoryChildrenOf(parentId: $parentId) {
    id
    title
    productCount
    hasChildren
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CategoryChildrenOfGQL extends Apollo.Query<CategoryChildrenOfQuery, CategoryChildrenOfQueryVariables> {
    document = CategoryChildrenOfDocument;
    
  }
export const AllProductsDocument = gql`
    query AllProducts {
  products {
    name
    description
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AllProductsGQL extends Apollo.Query<AllProductsQuery, AllProductsQueryVariables> {
    document = AllProductsDocument;
    
  }
export const SearchProductsDocument = gql`
    query SearchProducts($search: String!) {
  products(search: $search) {
    name
    description
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SearchProductsGQL extends Apollo.Query<SearchProductsQuery, SearchProductsQueryVariables> {
    document = SearchProductsDocument;
    
  }
export const ProductDocument = gql`
    query Product($id: ID!) {
  product(id: $id) {
    id
    name
    description
    sale
    inStock
    images {
      imageUrl
    }
    priceRange {
      min
      max
    }
    store {
      name
      logo {
        imageUrl
      }
    }
    skus {
      id
      stock
      price
      currency
      attributes {
        id
        name
        attributeGroup {
          id
          name
        }
      }
    }
    categories(tree: true) {
      title
      children {
        title
        children {
          title
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ProductGQL extends Apollo.Query<ProductQuery, ProductQueryVariables> {
    document = ProductDocument;
    
  }
export const SearchStoresDocument = gql`
    query SearchStores {
  stores {
    id
    name
    banner {
      imageUrl
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SearchStoresGQL extends Apollo.Query<SearchStoresQuery, SearchStoresQueryVariables> {
    document = SearchStoresDocument;
    
  }