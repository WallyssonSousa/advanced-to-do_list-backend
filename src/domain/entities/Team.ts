export interface TeamProps {
    uuid: string;
    name: string;
    description: string;
    responsavel: string;
}

export class Team {
    private uuid: string;
    private name: string;
    private description?: string;
    private responsavel: string;

    constructor(props: TeamProps){
        this.uuid = props.uuid;
        this.name = props.name;
        this.description = props.description;
        this.responsavel = props.responsavel
    }

    getUUID(){
        return this.uuid;
    }

    getName(){
        return this.name;
    }

    getDescription(){
        return this.description;
    }

    getResponsavel(){ 
        return this.responsavel;
    }
}