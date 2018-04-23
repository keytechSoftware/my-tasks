    export class TasksResponse {
        constructor(
            public PageNumber: number,
            public Totalrecords: number,
            public PageSize: number,
            public ElementList: Element[]
        ){}

        public static ToArray(response:TasksResponse){  
            let keys = [];
            for (let key in response.ElementList) {
                keys.push({value: response.ElementList[key]});
            }
            return keys;
        }
    };
    
    export class Element {
        constructor(
            public Key: string,
            public KeyValueList: any[],
            public DisplayName: string,
            public ProjectFolder: string,
            public Subject: string,
            public Body: string,
            public Priority: number,
            public PriorityDisplayText: string,
            public TransportDate: Date,
            public Recipient: string,
            public HasAttachments: boolean,
            public RecipientLong: string,
            public IsRead: boolean,
            public Category: number,
            public CategoryDisplayText: string,
            public Sender: string,
            public SenderLong: string,
            public PlannedStart: Date,
            public PlannedEnd: Date,
            public DueDate: Date,
            public StartDate: Date,
            public CompletedPercent: number,
            public TaskStatus: number,
            public TaskStatusDisplayText: string,
            public TaskType: number,
            public TaskTypeDisplayText: string,
            public PlannedHours: number,
            public UsedTime: number,
            public TaskConditionDisplayText: string,
            public TaskCondition: number,
            public Owner: string,
            public OwnerLong: string,
            public ClassDisplayName: string,
            public Description: string,
            public CreatedAt: Date,
            public CreatedBy: string,
            public CreatedByLong: string,
            public ChangedAt: Date,
            public ChangedBy: string,
            public ChangedByLong: string,
            public ThumbnailHint: string
            ){}
    }


