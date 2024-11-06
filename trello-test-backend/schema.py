import graphene


class Card(graphene.ObjectType):
    id = graphene.ID()
    title = graphene.String()
    description = graphene.String()
    column_id = graphene.ID()
    position = graphene.Int()
    status = graphene.String() # e.g., "To Do", "In Progress", "Done"



class Lists(graphene.ObjectType):
    id = graphene.ID()
    title = graphene.String()
    cards = graphene.List(Card)

class Board(graphene.ObjectType):
    id = graphene.ID()
    title = graphene.String()
    columns = graphene.List(Lists)

class Query(graphene.ObjectType):
    test_field = graphene.String()

    def resolve_test_field(root, info):
        return "Apollo Client is connected!"

schema = graphene.Schema(query=Query)


