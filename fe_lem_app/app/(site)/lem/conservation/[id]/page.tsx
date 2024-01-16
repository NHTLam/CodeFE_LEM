interface IParams {
    conservationId: string;
};

const ConservationId = async ({params}: {params: IParams}) =>{
    return (
        <div>
            Conservation ID !
        </div>
    );
}

export default ConservationId;