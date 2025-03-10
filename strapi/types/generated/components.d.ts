import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentsLink extends Struct.ComponentSchema {
  collectionName: 'components_components_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ComponentsList extends Struct.ComponentSchema {
  collectionName: 'components_components_lists';
  info: {
    description: '';
    displayName: 'List';
  };
  attributes: {
    termsText: Schema.Attribute.Component<'components.terms-text', true>;
  };
}

export interface ComponentsTermsBlock extends Struct.ComponentSchema {
  collectionName: 'components_components_terms_blocks';
  info: {
    description: '';
    displayName: 'TermsBlock';
  };
  attributes: {
    termsText: Schema.Attribute.Component<'components.terms-text', true>;
  };
}

export interface ComponentsTermsText extends Struct.ComponentSchema {
  collectionName: 'components_components_terms_texts';
  info: {
    description: '';
    displayName: 'TermsText';
  };
  attributes: {
    subheading: Schema.Attribute.Text;
    termsText: Schema.Attribute.Blocks;
  };
}

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    description: '';
    displayName: 'Footer';
  };
  attributes: {
    navigationLinks: Schema.Attribute.Component<'components.link', true>;
    socialLinks: Schema.Attribute.Component<'components.link', true>;
  };
}

export interface LayoutHeader extends Struct.ComponentSchema {
  collectionName: 'components_layout_headers';
  info: {
    displayName: 'Header';
  };
  attributes: {
    loggedInLinks: Schema.Attribute.Component<'components.link', true>;
    loggedOutLinks: Schema.Attribute.Component<'components.link', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'components.link': ComponentsLink;
      'components.list': ComponentsList;
      'components.terms-block': ComponentsTermsBlock;
      'components.terms-text': ComponentsTermsText;
      'layout.footer': LayoutFooter;
      'layout.header': LayoutHeader;
    }
  }
}
