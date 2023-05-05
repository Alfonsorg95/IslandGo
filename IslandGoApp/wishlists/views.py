from rest_framework import viewsets
from rest_framework.response import Response

from .models import Wishlist
from .serializers import WishlistsSerializer
from .services import create_wishlist


class WishlistView(viewsets.ModelViewSet):
    queryset = Wishlist.objects.all()
    serializer_class = WishlistsSerializer

    def create(self, request):
        buyer = self.request.data.get("buyer")
        items = self.request.data.get("items")
        store = int(self.request.data.get("store"))

        wishlist = create_wishlist(buyer, items, store)
        wishlist_data = WishlistsSerializer(wishlist, many=False)

        return Response(wishlist_data.data)
