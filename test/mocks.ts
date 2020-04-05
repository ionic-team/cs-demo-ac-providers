export function createActivatedRouteMock() {
    return {
        snapshot: {
            paramMap: jasmine.createSpyObj('Snapshot', ['get'])
        }
    };
}

export function createNavControllerMock() {
    return jasmine.createSpyObj('NavController', [
        'back',
        'navigateForward',
        'navigateRoot'
    ]);
}

export function createOverlayElementMock(name: string) {
    return jasmine.createSpyObj(name, ['dismiss', 'present']);
}

export function createOverlayControllerMock(name: string, element?: any) {
    return jasmine.createSpyObj(name, {
        create: Promise.resolve(element),
        dismiss: undefined,
        getTop: Promise.resolve(element)
    });
}

export function createPlatformMock() {
    return jasmine.createSpyObj('Platform', {
        ready: Promise.resolve(),
        is: false
    });
}

export function createRouterMock() {
    return jasmine.createSpyObj('Router', {
        navigate: Promise.resolve(true)
    });
}

export function createStorageMock() {
    return jasmine.createSpyObj('Storage', {
        clear: Promise.resolve(),
        get: Promise.resolve(),
        ready: Promise.resolve(),
        remove: Promise.resolve(),
        set: Promise.resolve()
    });
}