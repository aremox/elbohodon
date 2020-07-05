 // Generated by https://quicktype.io

export interface RespuestaTopHeadlines {
    status:       string;
    totalResults: number;
    articles:     Article[];
}

export interface Article {
    source:      Source;
    author:      null | string;
    title:       string;
    description: string;
    url:         string;
    urlToImage:  null | string;
    publishedAt: string;
    content:     string;
}

export interface Source {
    id:   null | string;
    name: string;
}

// Generated by https://quicktype.io

export interface post {
    id:                         number;
    date:                       string;
    date_gmt:                   string;
    guid:                       GUID;
    modified:                   string;
    modified_gmt:               string;
    slug:                       string;
    status:                     StatusEnum;
    type:                       PostTypeEnum;
    link:                       string;
    title:                      GUID;
    content:                    Content;
    excerpt:                    Content;
    author:                     number;
    featured_media:             number;
    comment_status:             Status;
    ping_status:                Status;
    sticky:                     boolean;
    template:                   string;
    format:                     Format;
    meta:                       Meta;
    categories:                 number[];
    tags:                       number[];
    jetpack_featured_media_url: string;
    _links:                     TopLevelLinks;
    _embedded:                  Embedded;
    tagsTexto?:                  string[];
}

export interface Embedded {
    author:             EmbeddedAuthor[];
    "wp:featuredmedia": WpFeaturedmedia[];
    "wp:term":          Array<EmbeddedWpTerm[]>;
    replies?:           Array<Reply[]>;
}

export interface EmbeddedAuthor {
    id:          number;
    name:        SlugEnum;
    url:         string;
    description: string;
    link:        string;
    slug:        SlugEnum;
    avatar_urls: { [key: string]: string };
    _links:      AuthorLinks;
}

export interface AuthorLinks {
    self:       About[];
    collection: About[];
}

export interface About {
    href: string;
}

export enum SlugEnum {
    Admin = "admin",
}

export interface Reply {
    id:                 number;
    parent:             number;
    author:             number;
    author_name:        string;
    author_url:         string;
    date:               string;
    content:            GUID;
    link:               string;
    type:               string;
    author_avatar_urls: { [key: string]: string };
    _links:             ReplyLinks;
}

export interface ReplyLinks {
    self:           About[];
    collection:     About[];
    up:             Up[];
    "in-reply-to"?: ReplyElement[];
    children?:      About[];
}

export interface ReplyElement {
    embeddable: boolean;
    href:       string;
}

export interface Up {
    embeddable: boolean;
    post_type:  PostTypeEnum;
    href:       string;
}

export enum PostTypeEnum {
    Post = "post",
}

export interface GUID {
    rendered: string;
}

export interface WpFeaturedmedia {
    id:            number;
    date:          string;
    slug:          string;
    type:          WpFeaturedmediaType;
    link:          string;
    title:         GUID;
    author:        number;
    caption:       GUID;
    alt_text:      string;
    media_type:    MediaType;
    mime_type:     MIMEType;
    media_details: MediaDetails;
    source_url:    string;
    _links:        WpFeaturedmediaLinks;
}

export interface WpFeaturedmediaLinks {
    self:       About[];
    collection: About[];
    about:      About[];
    author?:    ReplyElement[];
    replies:    ReplyElement[];
}

export interface MediaDetails {
    width:           number;
    height:          number;
    file:            string;
    sizes:           Sizes;
    image_meta:      ImageMeta;
    original_image?: string;
}

export interface ImageMeta {
    aperture:          string;
    credit:            string;
    camera:            Camera;
    caption:           string;
    created_timestamp: string;
    copyright:         string;
    focal_length:      string;
    iso:               string;
    shutter_speed:     string;
    title:             string;
    orientation:       string;
    keywords:          any[];
}

export enum Camera {
    CoolpixL310 = "COOLPIX L310",
    Empty = "",
}

export interface Sizes {
    medium:       The1536_X1536;
    large:        The1536_X1536;
    thumbnail:    The1536_X1536;
    medium_large: The1536_X1536;
    full:         The1536_X1536;
    "1536x1536"?: The1536_X1536;
    "2048x2048"?: The1536_X1536;
}

export interface The1536_X1536 {
    file:       string;
    width:      number;
    height:     number;
    mime_type:  MIMEType;
    source_url: string;
}

export enum MIMEType {
    ImageJPEG = "image/jpeg",
}

export enum MediaType {
    Image = "image",
}

export enum WpFeaturedmediaType {
    Attachment = "attachment",
}

export interface EmbeddedWpTerm {
    id:       number;
    link:     string;
    name:     WpTermName;
    slug:     Slug;
    taxonomy: Taxonomy;
    _links:   WpTermLinks;
}

export interface WpTermLinks {
    self:           About[];
    collection:     About[];
    about:          About[];
    "wp:post_type": About[];
    curies:         Cury[];
}

export interface Cury {
    name:      CuryName;
    href:      Href;
    templated: boolean;
}

export enum Href {
    HTTPSAPIWOrgRel = "https://api.w.org/{rel}",
}

export enum CuryName {
    Wp = "wp",
}

export enum WpTermName {
    InformaciónGeneral = "Información General",
    Noticias = "Noticias",
    Parroquia = "Parroquia",
}

export enum Slug {
    InformacionGeneral = "informacion-general",
    Noticias = "noticias",
    Parroquia = "parroquia",
}

export enum Taxonomy {
    Category = "category",
    PostTag = "post_tag",
}

export interface TopLevelLinks {
    self:                   About[];
    collection:             About[];
    about:                  About[];
    author:                 ReplyElement[];
    replies:                ReplyElement[];
    "version-history":      VersionHistory[];
    "predecessor-version"?: PredecessorVersion[];
    "wp:featuredmedia":     ReplyElement[];
    "wp:attachment":        About[];
    "wp:term":              LinksWpTerm[];
    curies:                 Cury[];
}

export interface PredecessorVersion {
    id:   number;
    href: string;
}

export interface VersionHistory {
    count: number;
    href:  string;
}

export interface LinksWpTerm {
    taxonomy:   Taxonomy;
    embeddable: boolean;
    href:       string;
}

export enum Status {
    Closed = "closed",
    Open = "open",
}

export interface Content {
    rendered:  string;
    protected: boolean;
}

export enum Format {
    Standard = "standard",
}

export interface Meta {
    spay_email: string;
}

export enum StatusEnum {
    Publish = "publish",
}

// Generated by https://quicktype.io

export interface Tag {
    id:          number;
    count:       number;
    description: string;
    link:        string;
    name:        string;
    slug:        string;
    taxonomy:    Taxonomy;
    meta:        any[];
    _links:      Links;
}

export interface Links {
    self:           About[];
    collection:     About[];
    about:          About[];
    "wp:post_type": About[];
    curies:         Cury[];
}

export interface About {
    href: string;
}



export enum Name {
    Wp = "wp",
}

// Generated by https://quicktype.io

export interface Usuario {
    token?:             string;
    user_email?:        string;
    user_nicename?:     string;
    user_display_name?: string;
    user_password?:     string;
}

// Generated by https://quicktype.io

export interface UsuarioRegistrado {
    id?:                 number;
    username?:           string;
    name?:               string;
    first_name?:         string;
    last_name?:          string;
    email?:              string;
    url?:                string;
    description?:        string;
    link?:               string;
    locale?:             string;
    nickname?:           string;
    slug?:               string;
    roles?:              string[];
    registered_date?:    string;
    capabilities?:       Capabilities;
    extra_capabilities?: ExtraCapabilities;
    avatar_urls?:        { [key: string]: string };
    meta?:               any[];
    password?:           string;
    _links?:             Links;
}

export interface Links {
    self:       Collection[];
    collection: Collection[];
}

export interface Collection {
    href: string;
}

export interface Capabilities {
    read:          boolean;
    level_0:       boolean;
    view_ticket:   boolean;
    create_ticket: boolean;
    close_ticket:  boolean;
    reply_ticket:  boolean;
    attach_files:  boolean;
    subscriber:    boolean;
}

export interface ExtraCapabilities {
    subscriber: boolean;
}



