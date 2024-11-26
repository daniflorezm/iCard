import React from 'react'
import "./TableCategoryAdmin.scss";
import { Table, Image, Button, Icon } from "semantic-ui-react";
import { map } from "lodash";

export function TableCategoryAdmin(props) {
    const { categories, updateCategory, deleteCategory } = props;

    return (
        <Table className='table-category-admin'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Imagen</Table.HeaderCell>
                    <Table.HeaderCell>Categoria</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {map(categories, (category, index) => (
                    <Table.Row key={index}>
                        <Table.Cell>
                            <Image src={category.image} />
                        </Table.Cell>
                        <Table.Cell>{category.title}</Table.Cell>
                        <Actions category={category} updateCategory={updateCategory} deleteCategory={deleteCategory} />
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}

function Actions(props) {
    const { category, updateCategory, deleteCategory } = props;
    return (
        <Table.Cell textAlign='right'>
            <Button icon onClick={() => updateCategory(category)}>
                <Icon name='pencil' />
            </Button>
            <Button icon negative onClick={() => deleteCategory(category)}>
                <Icon name='close' />
            </Button>

        </Table.Cell>
    )
}

