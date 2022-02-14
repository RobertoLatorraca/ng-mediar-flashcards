export class User {
    username!: string;
    authorities: string[] = [];
    provider!: string;

    enabled!: boolean;
    accountNonExpired!: boolean;
    accountNonLocked!: boolean;
    credentialsNonExpired!: boolean;

    name!: string;
    picture!: string;
    socialEmail!: string;
}
