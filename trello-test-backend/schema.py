import graphene


class Card(graphene.ObjectType):
    id = graphene.ID()
    title = graphene.String()
    description = graphene.String()
    column_id = graphene.ID()
    position = graphene.Int()
    status = graphene.String() # e.g., "To Do", "In Progress", "Done"



class Column(graphene.ObjectType):
    id = graphene.ID()
    title = graphene.String()
    cards = graphene.List(Card)

class Board(graphene.ObjectType):
    id = graphene.ID()
    title = graphene.String()
    columns = graphene.List(Column)

class Query(graphene.ObjectType):
    test_field = graphene.String()

    def resolve_test_field(root, info):
        return "Apollo Client is connected!"

schema = graphene.Schema(query=Query)


# class CreateCard(graphene.Mutation):
#     # Implement create card mutation

# class Mutation(graphene.ObjectType):
#     create_card = CreateCard.Field()
#     # Other mutations

# schema = graphene.Schema(query=Query, mutation=Mutation)
