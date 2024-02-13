import styled from 'styled-components'

interface IPropertyItemProps {
    $property: number;
    $propertyName: string;
    $type: 's' | '%' | 'x' | '';
    $isEnemy?: boolean;
}

function PropertyItem({$type, $property, $propertyName, $isEnemy}:IPropertyItemProps) {

    return (
        <Property>
            <Name>
                {$propertyName}:
            </Name>
            <Score>
                {
                    $property > 0
                        ? !$isEnemy 
                            ? '+' + $property
                            : $property
                        : $property
                }{$type}
            </Score>
        </Property>
    );
}



const Score = styled.p`
    position: relative;
`

const Name = styled.p`

`

const Property = styled.div`
    font-size: 1rem;
    width: 100%;
    border-bottom: 1px solid black;
    padding-bottom: 0.5rem;

    display: flex;
    justify-content: space-between;

`

export default PropertyItem;