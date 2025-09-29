import { DateCalendarProps } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { default as default_2 } from 'react';
import { DialogProps } from '@mui/material';
import { DragEvent as DragEvent_2 } from 'react';
import { ForwardRefExoticComponent } from 'react';
import { GridSize } from '@mui/material';
import { ReactElement } from 'react';
import { ReactNode } from 'react';
import { RefAttributes } from 'react';
import { RRule } from 'rrule';
import { SchedulerProps as SchedulerProps_2 } from './types.ts';

export declare interface CalendarEvent {
    event_id: number | string;
    title: ReactNode;
    subtitle?: ReactNode;
    start: Date;
    end: Date;
    recurring?: RRule;
    disabled?: boolean;
    color?: string;
    textColor?: string;
    editable?: boolean;
    deletable?: boolean;
    draggable?: boolean;
    allDay?: boolean;
    agendaAvatar?: ReactElement | string;
}

export declare interface CellRenderedProps {
    day: Date;
    start: Date;
    end: Date;
    height: number;
    onClick(): void;
    onDragOver(e: DragEvent_2<HTMLButtonElement>): void;
    onDragEnter(e: DragEvent_2<HTMLButtonElement>): void;
    onDragLeave(e: DragEvent_2<HTMLButtonElement>): void;
    onDrop(e: DragEvent_2<HTMLButtonElement>): void;
}

export declare interface CustomDialogProps {
    open: boolean;
    state: FormState;
    selectedEvent?: ProcessedEvent;
    selectedResource?: DefaultResource['assignee'];
    close(): void;
    onConfirm(event: ProcessedEvent | ProcessedEvent[], action: EventActions): void;
}

export declare type DayHours = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;

export declare interface DayProps {
    startHour: DayHours;
    endHour: DayHours;
    step: number;
    cellRenderer?(props: CellRenderedProps): default_2.ReactNode;
    headRenderer?(day: Date): default_2.ReactNode;
    hourRenderer?(hour: string): default_2.ReactNode;
    navigation?: boolean;
}

export declare type DefaultResource = {
    assignee?: string | number;
    text?: string;
    subtext?: string;
    avatar?: string;
    color?: string;
} & Record<string, any>;

export declare type EventActions = 'create' | 'edit';

export declare interface EventRendererProps {
    event: ProcessedEvent;
    draggable?: boolean;
    onDragStart?: (e: DragEvent_2<HTMLElement>) => void;
    onDragEnd?: (e: DragEvent_2<HTMLElement>) => void;
    onDragOver?: (e: DragEvent_2<HTMLElement>) => void;
    onDragEnter?: (e: DragEvent_2<HTMLElement>) => void;
    onClick?: (e: default_2.MouseEvent<HTMLElement>) => void;
}

export declare interface FieldInputProps {
    label?: string;
    placeholder?: string;
    required?: boolean;
    variant?: 'standard' | 'filled' | 'outlined';
    disabled?: boolean;
    min?: number;
    max?: number;
    email?: boolean;
    decimal?: boolean;
    multiline?: boolean;
    rows?: number;
    type?: 'date' | 'datetime';
    multiple?: MultipleType;
    loading?: boolean;
    errMsg?: string;
    md?: GridSize;
    sm?: GridSize;
    xs?: GridSize;
}

export declare interface FieldProps {
    name: string;
    type: InputTypes;
    options?: SelectOption[];
    default?: unknown;
    config?: FieldInputProps;
}

declare interface FormState {
    [key: string]: StateItem;
}

export declare type InputTypes = 'input' | 'number' | 'date' | 'datetime' | 'select' | 'hidden';

declare type LocaleDirection = 'rtl' | 'ltr';

declare interface MonthProps {
    weekDays: WeekDays[];
    weekStartOn: WeekDays;
    startHour: DayHours;
    endHour: DayHours;
    cellRenderer?(props: CellRenderedProps): default_2.ReactNode;
    headRenderer?(day: Date): default_2.ReactNode;
    navigation?: boolean;
    disableGoToDay?: boolean;
}

declare type MultipleType = 'chips' | 'default';

declare interface OptionalSchedulerProps {
    agenda?: boolean;
    enableAgenda?: boolean;
    enableTodayButton?: boolean;
    alwaysShowAgendaDays?: boolean;
    month?: MonthProps | null;
    week?: WeekProps | null;
    day?: DayProps | null;
    selectedResource?: DefaultResource['assignee'];
    minDate?: Date | null;
    maxDate?: Date | null;
    navigation?: boolean;
    disableViewNavigator?: boolean;
    navigationPickerProps?: Partial<Omit<DateCalendarProps<Dayjs>, 'open' | 'onClose' | 'openTo' | 'views' | 'value' | 'readOnly' | 'onChange'>>;
    eventRenderer?: (props: EventRendererProps) => ReactElement | null;
    getRemoteEvents?(params: RemoteQuery): Promise<ProcessedEvent[] | void>;
    loading?: boolean;
    loadingComponent?: ReactElement;
    onConfirm?(event: ProcessedEvent, action: EventActions): Promise<ProcessedEvent>;
    onDelete?(deletedId: string | number): Promise<string | number | void>;
    customDialog?: (props: CustomDialogProps) => ReactElement;
    customViewer?(event: ProcessedEvent, close: () => void): ReactElement;
    viewerExtraComponent?: ReactElement | ((fields: FieldProps[], event: ProcessedEvent) => ReactElement);
    viewerTitleComponent?(event: ProcessedEvent): ReactElement;
    viewerSubtitleComponent?(event: ProcessedEvent): ReactElement;
    disableViewer?: boolean;
    resourceHeaderComponent?(resource: DefaultResource): ReactElement;
    onResourceChange?(resource: DefaultResource): void;
    timeZone?: string;
    onEventDrop?(event: DragEvent_2<HTMLButtonElement>, droppedOn: Date, updatedEvent: ProcessedEvent, originalEvent: ProcessedEvent): Promise<ProcessedEvent | void>;
    onEventClick?(event: ProcessedEvent): void;
    onEventEdit?(event: ProcessedEvent): void;
    deletable?: boolean;
    editable?: boolean;
    draggable?: boolean;
    onSelectedDateChange?(date: Date): void;
    onViewChange?(view: View, agenda?: boolean): void;
    stickyNavigation?: boolean;
    onClickMore?(date: Date, goToDay: (date: Date) => void): void;
    onCellClick?(start: Date, end: Date, resourceKey?: string, resourceVal?: string | number): void;
}

export declare type ProcessedEvent = CalendarEvent & Record<string, any>;

export declare type RemoteQuery = {
    start: Date;
    end: Date;
    view: 'day' | 'week' | 'month';
};

declare interface RequiredSchedulerProps {
    height: number;
    view: View;
    selectedDate: Date;
    events: ProcessedEvent[];
    fields: FieldProps[];
    resources: DefaultResource[];
    resourceFields: ResourceFields;
    resourceViewMode: ResourceViewMode;
    direction: LocaleDirection;
    dialogMaxWidth: DialogProps['maxWidth'];
    locale: string;
    translations: Translations;
    hourFormat: '12' | '24';
}

export declare type ResourceFields = {
    idField: string;
    textField: string;
    subTextField?: string;
    avatarField?: string;
    colorField?: string;
} & Record<string, string>;

declare type ResourceViewMode = 'default' | 'tabs' | 'vertical';

/**
 * Scheduler Component
 *
 * A comprehensive scheduler/calendar component that supports:
 * - Multiple view types (day, week, month)
 * - Event management
 * - Resource scheduling
 * - Custom rendering
 *
 * @example
 * ```tsx
 * <Scheduler
 *   height={600}
 *   events={events}
 *   onEventClick={(event) => console.log(event)}
 *   locale="en|fr|es"
 * />
 * ```
 */
export declare const Scheduler: ForwardRefExoticComponent<Partial<SchedulerProps_2> & RefAttributes<SchedulerRef>>;

export declare type SchedulerProps = Partial<SchedulerProps_3>;

declare interface SchedulerProps_3 extends RequiredSchedulerProps, OptionalSchedulerProps {
}

export declare interface SchedulerRef {
    el: HTMLDivElement;
    scheduler: Store;
}

declare interface SchedulerStateBase extends SchedulerProps_3 {
    dialog: boolean;
    selectedRange?: SelectedRange;
    selectedEvent?: ProcessedEvent;
    currentDragged?: ProcessedEvent;
    enableAgenda?: boolean;
}

declare type SelectedRange = {
    start: Date;
    end: Date;
};

declare type SelectOption = {
    id: string | number;
    text: string;
    value: any;
};

declare interface StateItem {
    value: any;
    validity: boolean;
    type: InputTypes;
    config?: FieldInputProps;
}

declare interface Store extends SchedulerStateBase {
    handleState(value: SchedulerStateBase[keyof SchedulerStateBase], name: keyof SchedulerStateBase): void;
    getViews(): View[];
    toggleAgenda(): void;
    triggerDialog(status: boolean, event?: SelectedRange | ProcessedEvent): void;
    triggerLoading(status: boolean): void;
    handleGotoDay(day: Date): void;
    confirmEvent(event: ProcessedEvent | ProcessedEvent[], action: EventActions): void;
    setCurrentDragged(event?: ProcessedEvent): void;
    onDrop(event: DragEvent_2<HTMLButtonElement>, eventId: string, droppedStartTime: Date, resourceKey?: string, resourceVal?: string | number): void;
}

export declare interface Translations {
    navigation: Record<View, string> & {
        today: string;
        agenda: string;
    };
    form: {
        addTitle: string;
        editTitle: string;
        confirm: string;
        delete: string;
        cancel: string;
    };
    event: {
        title: string;
        subtitle: string;
        start: string;
        end: string;
        allDay: string;
        [key: string]: string;
    };
    validation?: {
        required?: string;
        invalidEmail?: string;
        onlyNumbers?: string;
        min?: string | ((min: number) => string);
        max?: string | ((max: number) => string);
    };
    moreEvents: string;
    noDataToDisplay: string;
    loading: string;
}

export declare type View = 'month' | 'week' | 'day';

declare type WeekDays = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export declare interface WeekProps {
    weekDays: WeekDays[];
    weekStartOn: WeekDays;
    startHour: DayHours;
    endHour: DayHours;
    step: number;
    cellRenderer?(props: CellRenderedProps): default_2.ReactNode;
    headRenderer?(day: Date): default_2.ReactNode;
    hourRenderer?(hour: string): default_2.ReactNode;
    navigation?: boolean;
    disableGoToDay?: boolean;
}

export { }
