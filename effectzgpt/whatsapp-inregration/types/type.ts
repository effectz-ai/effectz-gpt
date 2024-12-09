interface BaseParameter {
    type: string;
}

interface ImageParameter extends BaseParameter {
    type: "image";
    image:{
        link: string;
    }
}

interface TextParameter extends BaseParameter {
    type: "text";
    text: string;
}

type Parameter = ImageParameter | TextParameter;

interface Component {
    type: string,
    parameters:Parameter[]
}
export type messageTemplate = {
    messaging_product: 'whatsapp';
    to: string;
    type: 'template';
    template: {
        namespace: string;
        name: string;
        language: {
            code: string;
        };
        components:Component[];

    }
}