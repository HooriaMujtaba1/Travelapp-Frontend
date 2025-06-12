from rest_framework import serializers
from .models import Listing, ListingImage, Booking

class ListingImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingImage
        fields = ['id', 'image']  # Returns the image URL in JSON


class ListingSerializer(serializers.ModelSerializer):
    # Return all images under this key. Read-only since admin handles creation
    images = ListingImageSerializer(many=True, read_only=True)

    class Meta:
        model = Listing
        fields = ['id', 'name', 'location_url', 'images']


class BookingSerializer(serializers.ModelSerializer):
    listing_id = serializers.IntegerField(write_only=True)
    listing_details = ListingSerializer(source='listing', read_only=True)

    class Meta:
        model = Booking
        fields = ['id', 'listing_id', 'listing_details', 'start_date', 'end_date', 'created_at']
        read_only_fields = ['id', 'created_at', 'listing_details']

    def validate(self, data):
        # Ensure start_date is before end_date
        if data['start_date'] > data['end_date']:
            raise serializers.ValidationError("Start date must be before end date.")

        request = self.context.get('request')
        user = request.user if request else None

        # If user is authenticated, restrict to listings owned by them
        if user and user.is_authenticated:
            try:
                listing = Listing.objects.get(id=data['listing_id'], user=user)
            except Listing.DoesNotExist:
                raise serializers.ValidationError("Listing not found or does not belong to you.")
        else:
            # For anonymous users, just check the listing exists
            try:
                listing = Listing.objects.get(id=data['listing_id'])
            except Listing.DoesNotExist:
                raise serializers.ValidationError("Listing not found.")

        data['listing'] = listing
        return data

    def create(self, validated_data):
        validated_data.pop('listing_id', None)

        user = self.context['request'].user
        if user.is_authenticated:
            validated_data['user'] = user
        else:
            validated_data['user'] = None

        return super().create(validated_data)
