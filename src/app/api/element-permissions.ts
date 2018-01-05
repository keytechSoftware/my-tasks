    export class ElementPermissions {
        constructor(
            public ElementKey: string,
            public Permissions: Permissions
        ){}
    }

    export class Permissions {
        constructor(    
            public AllowShowElement: boolean,
            public AllowModifyElement: boolean,
            public AllowDeleteElement: boolean,
            public AllowChangeStatus: boolean,
            public AllowModifyNoteOfType: string,
            public AllowCreateNoteOfType: string,
            public AllowLinkElement: boolean,
            public AllowedChildClasses: string,
            public AllowAcceptTask: boolean,
            public AllowDeclineTask: boolean,
            public AllowBookTime: boolean
        ){}
    }





