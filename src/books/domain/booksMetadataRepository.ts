export interface BooksMetadataRepository {
     getAllThemes(): Promise<string[]>;
     getAllSubgenres(): Promise<string[]>;
     getAllYears(): Promise<string[]>;
     getAllGenres(): Promise<string[]>;
     getAllFormats(): Promise<string[]>;
}