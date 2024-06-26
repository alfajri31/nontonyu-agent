import {find} from 'lodash';

export interface IContainerProvider {
    useValue: any;
    token: string;
}

export class Container {
    _providers: { [key: string]: any } = {};
    public resolve(token: string) {
        const matchedProvider = find(
            this._providers,
            (_provider, key) => key === token
        );

        if (matchedProvider) {
            return matchedProvider;
        } else {
            throw new Error(`No provider found for ${token}!`);
        }
    }

    public provide(details: IContainerProvider): void {
        this._providers[details.token] = details.useValue;
    }
}
export const container = new Container();
