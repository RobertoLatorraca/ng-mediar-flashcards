export class Url {

    // BACKEND
    public static SERVER = "http://localhost:8085";

    // AUTH
    public static SIGNIN_AUTH = Url.SERVER + "/auth/signin";
    public static REGISTER_AUTH = Url.SERVER + "/auth/register";
    public static GOOGLE_AUTH = Url.SERVER + "/auth/google";
    public static REFRESH_TOKEN_AUTH = Url.SERVER + "/auth/refreshtoken";    

    // API
    public static API = Url.SERVER + "/api";
    public static TOPICS_ENDPOINT = Url.API + "/topics";
    public static MODULES_ENDPOINT = Url.API + "/modules";
    public static BOOKS_ENDPOINT = Url.API + "/books";
    public static FLASHCARDS_ENDPOINT = Url.API + "/flashcards";
    public static USERS_ENDPOINT = Url.API + "/users";
    public static TEST_ENDPOINT = Url.API + "/tests";

}
